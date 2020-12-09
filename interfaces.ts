export type Post = {
  title:string
  id:number
  text:string
  tags:string
  user?:{
    name?:string
  }
}