const tip ='666666666666666666node.js'




export default async (ctx ,next) => {
  const message = ctx.weixin
  console.log(message,'reply')
 ctx.body =tip
 //next()
}