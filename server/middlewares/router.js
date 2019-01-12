import Router from 'koa-router'
import sha1 from 'sha1'
import config from '../config'

export const router = app => {
    const router =new Router()
  router.get('/wechat-hear' ,(ctx , next) => {
      const token = config.wechat.token
   const {
    signature,
    nonce,
    timpstamp,
    echostr




   } =ctx.query
  const str = [token ,timpstamp,nonce].sort().join('')
  const sha = sha1(str)
  if(sha=== signature){
    ctx.body = echostr
  } else {
    ctx.body = 'Failed'

  }
  
  })
// router.post('/wechat-hear' ,(ctx , next) {

    
//   })
  app.use(router.routes())
  app.use (router.allowdMethods())
}