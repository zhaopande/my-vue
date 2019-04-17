import Vue from 'vue'
function DataTransfer(data) {
  if (!(this instanceof DataTransfer)) {
    return new DataTransfer(data, null, null)
  }
}
// 数据转换
DataTransfer.treeToArray = function (data, parent, level, expandedAll) {
  let tmp = []
  Array.from(data).forEach(function (record) {
    if (record._expanded === undefined) {
      Vue.set(record, '_expanded', expandedAll)
    }
    if (parent) {
      Vue.set(record, '_parent', parent)
    }
    let _level = 0
    if (level !== undefined && level !== null) {
      _level = level + 1
    }
    Vue.set(record, '_level', _level)
    tmp.push(record)
    if (record.children && record.children.length > 0) { //_level 如果有下一级则标记层级，为首列间隔计数
      let children = DataTransfer.treeToArray(record.children, record, _level, expandedAll);
      // eslint-disable-next-line no-console
      console.log(children);
      // eslint-disable-next-line no-console
      console.log(tmp);
      tmp = tmp.concat(children)
    }
  })

  return tmp
}

export default DataTransfer
