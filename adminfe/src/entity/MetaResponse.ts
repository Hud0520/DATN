export interface MetaResponse<T extends Object> {
    errCode : string,
    errDesc : string,
    data : T,
  }