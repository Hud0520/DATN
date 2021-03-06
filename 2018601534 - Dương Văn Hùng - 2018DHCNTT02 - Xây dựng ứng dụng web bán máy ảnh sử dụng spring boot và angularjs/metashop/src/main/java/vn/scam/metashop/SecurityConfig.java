package vn.scam.metashop;

import java.io.IOException;
import java.security.SignatureException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import vn.scam.metashop.common.CommonUtils;
import vn.scam.metashop.common.CommonUtils.UserDetailPrincipal;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
//	@Override
//    protected void configure(HttpSecurity theHttpSecurity) throws Exception {
//        theHttpSecurity.authorizeRequests()
//                .antMatchers("/api/v1/**").access("permitAll")
//                .and().cors().and().csrf().disable();
//    }
//
//    @Override
//    public void configure(AuthenticationManagerBuilder theAuthentication) throws Exception {
//        theAuthentication.inMemoryAuthentication()
//                .withUser("sankalpa")
//                .password("{noop}123")
//                .authorities("ROLE_USER");
//    }
//
    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:4222","http://localhost:4200","http://localhost:62222"));
        configuration.setAllowedMethods(Arrays.asList("*"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
    
    @Autowired
	private CommonUtils commonUtils;
	
	@Bean
	public RestAuthenticationEntryPoint restServicesEntryPoint() {
		return new RestAuthenticationEntryPoint();
	}

	@Bean
	public CustomAccessDeniedHandler customAccessDeniedHandler() {
		return new CustomAccessDeniedHandler();
	}

	@Override
	protected void configure(HttpSecurity httpSecurity) throws Exception {
		TokenAuthenticationFilter tokenAuthenticationFilter=new TokenAuthenticationFilter(commonUtils);
//		httpSecurity.addFilterBefore(tokenAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
//
//		httpSecurity.authorizeHttpRequests().antMatchers("/api/admin/**").authenticated().and().exceptionHandling().authenticationEntryPoint(restServicesEntryPoint()).and()
//		.exceptionHandling().accessDeniedHandler(customAccessDeniedHandler());
//		
//		httpSecurity.csrf().disable().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
//				.authorizeRequests().antMatchers("/api/admin/v1/nguoidung/login").permitAll();
//		
		httpSecurity.cors().and().csrf().disable().authorizeHttpRequests().antMatchers("/api/v1/*").permitAll()
			.and().authorizeHttpRequests().antMatchers("/api/admin/v1/nguoidung/login").permitAll()
			.and().authorizeHttpRequests().antMatchers("/api/admin/**").authenticated()
			.and().exceptionHandling().authenticationEntryPoint(restServicesEntryPoint()).and().sessionManagement()
			.sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
			.addFilterBefore(tokenAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
	}

	public class TokenAuthenticationFilter implements Filter {
		private CommonUtils commonUtils;
		

		public TokenAuthenticationFilter(CommonUtils commonUtils) {
			super();
			this.commonUtils = commonUtils;
		}

		@Override
		public void init(FilterConfig filterConfig) throws ServletException {
		}
		
		@Override
		public void doFilter(final ServletRequest request, final ServletResponse response, final FilterChain chain)
				throws IOException, ServletException {
			final HttpServletRequest httpRequest = (HttpServletRequest) request;
			String accessToken = httpRequest.getHeader("authorization");
			if (accessToken != null&&accessToken.isEmpty()==false) {
				try {
					UserDetailPrincipal userDetail = this.commonUtils.getUserInfo(accessToken);
					
					boolean authenticated = userDetail.isAuthenticated();
					if (authenticated == true) {
						List<GrantedAuthority> grantedAuthorityList = new ArrayList<GrantedAuthority>();
						final UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
								userDetail, null, grantedAuthorityList);
						SecurityContextHolder.getContext().setAuthentication(authentication);
					} 
				} catch (SignatureException e) {
					System.out.println("Convert JWT error:"+accessToken+":"+httpRequest.getPathInfo());
				}catch (Exception e) {
					e.printStackTrace();
				}
			}

			chain.doFilter(request, response);
		}

		@Override
		public void destroy() {

		}

	}

}
