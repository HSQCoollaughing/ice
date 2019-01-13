import Router from 'koa-router'
import sha1 from 'sha1'
import config from '../config'
import reply from '../wechat/reply'
import wechatMiddle from '../wechat-lib/middleware'
import {resolve} from 'path'
//import Wechat from '../wechat-lib';
//import '../wechat'
export const router = app => {
    const router =new Router()
  router.all('/wechat-hear' ,wechatMiddle(config.wechat,reply))

  // router.get('/upload', (ctx,next) =>{
      
  //   let mp = require('../wechat')
  //   let client =mp.getWechat()
  //   client.handle('uploadMaterial','pic',resolve(__dirname,'../../322655.jpg'))

          
  // })
  
  app
  .use(router.routes())
  .use (router.allowedMethods())
}