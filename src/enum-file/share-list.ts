
export interface Share{
  name:string,
  icon:string,
  status:number,//是否隐藏
  value:string,//传给nativeShare函数的值
}

export const share_list:Array<Share> = [
  {
    name: "微信好友",
    icon: "image/share/wx.png",
    value: "wechatFriend",
    status: 1,
  },
  {
    name: "微信朋友圈",
    icon: "image/share/wx_circle.png",
    value: "wechatTimeline",
    status: 1,
  },
  {
    name: "微博",
    icon: "image/share/weibo.png",
    value: "weibo",
    status: 1,
  },
  {
    name: "QQ好友",
    icon: "image/share/qq.png",
    value: "qqFriend",
    status: 1,
  },
  {
    name: "QQ空间",
    icon: "image/share/qq_space.png",
    value: "qZone",
    status: 1,
  },
  {
    name: "复制链接",
    icon: "image/share/copy_link.png",
    value: "copyLink",
    status: 1,
  },
];
