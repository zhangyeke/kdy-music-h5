
// 工具条
export interface ToolBar {
  text?: string | number,
  iconName: string,
  namespace?: string,
}

// 操作菜单子项
export interface ActionItem {
  name: string,
  icon?: string,
  namespace?: string,
  color?: string
  disable?: boolean | number,
  per?:string[]
}

// 分页
export interface Paging {
  page:number,
  limit:number
}