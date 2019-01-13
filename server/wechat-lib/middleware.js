//import { util } from "node-forge";
import sha1 from 'sha1'
import getRawBody from 'raw-body'
import * as util from './util'
export default function (opts,reply) {
    return async function wechatMiddle(ctx,next){
        const token = opts.token
        const {
         signature,
         nonce,
         timestamp,
         echostr
     
     
     
     
        } =ctx.query
       const str = [token ,timestamp,nonce].sort().join('')
       const sha = sha1(str)
       console.log(sha=== signature,'签名通过')
       if(ctx.method=== 'GET'){
        if(sha=== signature){
            ctx.body = echostr
          } else {
            ctx.body = 'Failed'
        
          }

       } else if(ctx.method==='POST') {
        console.log("post进来了")
           console.log(ctx)
          
        if(sha!== signature){
            ctx.body ='FAILED'
            return false

       }
       const data =  await getRawBody(ctx.req,{//拿到整个数据
        //约束
        length: ctx.length,
        limit : '1mb',
        encoding : ctx.charset

       })
       const content = await util.parseXML(data)

       console.log(content ,'微信服务器的 数据')//微信服务器的 数据
       const message =util.formatMessage(content.xml)

       ctx.weixin =message//便于后面访问

       await reply.apply(ctx,[ctx,next])//回复策略
       const replyBody = ctx.body
       const msg =ctx.weixin
       const xml = util.tpl(replyBody,msg)
      console.log(replyBody,'replyBody')
    //   let now = new Date().getTime();
    //   const xml=`<xml>
    //    <ToUserName><![CDATA[${content.xml.FromUserName[0]}] ]></ToUserName> 
    //   <FromUserName> <![CDATA[${content.xml.ToUserName[0]}]]></FromUserName>
    //    <CreateTime>${now}</CreateTime>
    //     <MsgType><![CDATA[text]]></MsgType> 
    //     <Content><![CDATA[${replyBody}]]></Content>
    //      </xml>`
      
      
      console.log(xml)
       ctx.status=200
       ctx.type='application/xml'
       ctx.body=xml
        console.log("返回了")
   console.log(ctx)

    }
}

}