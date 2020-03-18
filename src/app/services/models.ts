export interface User {
  country: string,
  city: string,
  firstName: string,
  lastName: string,
  email?: string,
  image: string,
  lat: number,
  lon: number,
  gender: string,
  createdAt: string,
  updatedAt: string,
  id: number,
}

export interface Token {
  token?: string,
  expiredAt?: number,
}


export interface ResponseModel {
  code?: string,
  status?: string,
  message?: string,
  result: object,
}

export interface ResponseOk extends ResponseModel {
}


export interface ResponseOkPagin extends ResponseModel {
  _meta: {
    pagination: {
      totalCount: number,
      pageCount: number,
      currentPage: number,
      perPage: number,
    }
  },
}

