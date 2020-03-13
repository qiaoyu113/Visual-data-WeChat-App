//时间戳
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//普通选择器picker
const picker = val => {
  let arr = [];
  val.forEach(function (item) {
    arr.push(item.code);
  })
  return arr;
}

module.exports = {
  formatTime: formatTime,
  picker: picker
}