-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: metashop
-- ------------------------------------------------------
-- Server version	8.0.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `donhang`
--

DROP TABLE IF EXISTS `donhang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `donhang` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `KHACH_HANG` varchar(45) DEFAULT NULL,
  `MA_DON_HANG` varchar(20) DEFAULT NULL,
  `HO_TEN` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `NGAY_TAO` datetime DEFAULT CURRENT_TIMESTAMP,
  `DIA_CHI_NHAN` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `SDT_NGUOI_NHAN` varchar(10) DEFAULT NULL,
  `TRANG_THAI` varchar(2) DEFAULT NULL COMMENT 'Null 0 : Chờ xác nhận.\n1 : Đã xác nhận đang chuẩn bị hàng.\n2 : Đang giao hàng.\n3 : Giao hàng thành công.\n4 : Giao hàng không thành công\n5: Đơn hàng bị hủy',
  `NGUOI_THUC_HIEN` varchar(1000) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `MO_TA` varchar(1000) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `GHI_CHU` blob,
  `EMAIL_NGUOI_NHAN` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `donhang`
--

LOCK TABLES `donhang` WRITE;
/*!40000 ALTER TABLE `donhang` DISABLE KEYS */;
INSERT INTO `donhang` VALUES (1,'','','2313123',NULL,'213123','12323','0','','','','1232323'),(3,'','','xcfsd','2022-05-15 15:57:40','sdfsdf','123123','0','','','','123123'),(4,'','','xcfsd','2022-05-15 16:04:11','sdfsdf','123123','0','','','','123123'),(5,'','','123','2022-05-15 16:04:50','12323','12323','0','','','','232323'),(6,'','','123','2022-05-15 16:06:12','12323','12323','0','','','','232323'),(7,'','','123','2022-05-15 16:06:48','12323','12323','0','','','','232323'),(8,'','','Hụngdf','2022-05-15 16:22:17','ádsd','1231232','0','','','','sdff'),(9,'','','sdhiasd','2022-05-15 16:59:11','12323','123123','0','','','','Hungf'),(10,'','','sfsdf','2022-05-15 17:00:50','asfd','2313','0','','','','dsf@mnf.co'),(11,'','','Hung','2022-05-16 10:49:43','Hà Nội','89645','0','','','','hung123@gmail.com');
/*!40000 ALTER TABLE `donhang` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-16 13:37:19
