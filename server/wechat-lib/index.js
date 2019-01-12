 import request from 'request-promise'
 const base = 'https://api.weixin.qq.com/cgi-bin/' 
const api = {
    accessToken : base+ 'token?grant_type=client_credential',

}


  export default  class Wechat {
    constructor(opts){
        this.opts = Object.assign({} , opts)
        this.appID = opts.appID
        this.appSecret = opts.appSecret
        this.getAccessToken=opts.getAccessToken
        this.saveAccessToken=opts.saveAccessToken
        this.fetchAccessToken()
        console.log("构造wechat")
        // const url = api.accessToken + '&appid=' +this.appID +'&secret='+this.appSecret
        // const data = await this.request({url:url})
        // console.log(data)
       

    }
    //发请求
    async request (options) {
        console.log("发请求获取access_token")
        options = Object.assign({},options,{json: true})
        try{
            const response =await request(options)
            console.log(response)
            return response
        }catch(error){
            console.error(error)
        }
      
    }
    async fetchAccessToken () {
        console.log('fetchAccessToken')
        // const url = api.accessToken + '&appid=' +this.appID +'&secret='+this.appSecret
        // const a = await this.request({url:url})
        // console.log(a)
        let data = await this.getAccessToken()
        console.log(data)
        if(!this.isValidAccessToken(data)) {
            data= await this.updateAccesasToken()
        }
        await this.saveAccessToken(data)
        return data
        // if (isValid(data)) {

        //     return await this.updateAccesasToken()
        // }

    }
    async updateAccesasToken () { 
         console.log("updateAccesasToken")
        const url = api.accessToken + '&appid=' +this.appID +'&secret='+this.appSecret
        const data = await this.request({url:url})
        const now = (new Date().getTime())
        const expireIn = now + (data.expires_in-20) * 1000
        data.expires_in =expireIn
        return data

    }

    isValidAccessToken(data) {
       if(!data || !data.access_token || !data.expires_in) {
            return false
       }
     const expireIn = data.expires_in
     const now = (new Date().getTime() )
     if(now < expireIn) {
        return true


     }else{
         return false
     }
    }
 }