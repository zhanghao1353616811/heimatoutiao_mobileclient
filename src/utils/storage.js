/**
 * 封装操作本地存储的工具方法模块
 */

/**
  * 获取指定数据
  * @param { String } 数据名称
  */
export const getItem = name => {
  const data = window.localStorage.getItem(name)
  try {
    return JSON.parse(data)
  } catch (error) {
    console.log('转换失败', error)
    return data
  }
}

/**
 * 存储数据
 * @param {String} 数据名称
 * @param {} 数据值
 */
export const setItem = (name, value) => {
  const data = typeof value === 'object' ? JSON.stringify(value) : value
  return window.localStorage.setItem(name, data)
}

/**
 * 删除数据
 * @param {String}数据名称
 */
export const removeItem = name => {
  return window.localStorage.removeItem(name)
}
