// import axios from 'axios';
import $ from 'jquery';

var TOKEN = '9ec359fec7f3f9044ca0665c10208ce7';

const alert = function (title,msg) { // 提示框;
  if ($('#dialog_bg')) {
    $('#dialog_bg, #dialog_content').remove();
  }

  var dialogue = '<div id="dialog_bg" style="width:100%;height:100%;position:fixed;top:0;left:0;z-index:9998;background: rgba(0, 0, 0, 0.3);opacity:0.30;filter: alpha(opacity=30);"></div>'
      + '<div id="dialog_content" style="font-family:\'Microsoft YaHei\';width:240px;height:140px;position:fixed;top:0;right:0;bottom:0;left:0;margin:auto;color:#333;background: #fff;z-index:9999;border-radius:3px;box-shadow: 0 1px 1px 1px rgba(0,0,0,.2);">'
      + '<div style="position:relative;padding: 12px 15px;font-size:12px;">'+title+'</div>'
      + '<span id="close" style="width:35px;height:35px;position:absolute;top:0;right:0;text-align:center;line-height:32px;font-size:24px;border-radius:2px;cursor:pointer;" onmouseover="this.style.backgroundColor=\'#E44444\'; this.style.color=\'#fff\'" onmouseout="this.style.backgroundColor=\'#fff\'; this.style.color=\'#333\'">×</span>'
      + '<div style="width:240px;height:60px;display:table-cell;vertical-align:middle;padding:0 10px;text-align:center;font-size: 14px;">'+msg+'</div></div>';
  $('body').append(dialogue);

  $('#close').on('click', function () {
    $('#dialog_bg, #dialog_content').remove();
  })
}

const http = (method, data = {}, callback = null, error = null) => {
  data.token = TOKEN;

  $.ajax({
    type: method,
    url: '/csc-administration/ServiceServlet',
    dataType: 'json',
    data: data,
    success:function(msg){
      if (msg !== null && msg !== undefined) {
        if (msg.rspCode == '000000') {
            callback(msg)
        } else if (msg.rspCode == '100003') {
          // parent.location.reload();
        } else {
            alert('提示',msg.rspDesc);
            if (error !== null) {
              error()
            }
        }
      }else {
        alert('请求失败');
        if (error !== null) {
          error()
        }
      }
    },
    error:function(){
      alert('提示','喔唷，崩溃啦！');
      if (error !== null) {
        error()
      }
    }
  })
  // axios({
  //   method: method,
  //   url: '/csc-administration/ServiceServlet',
  //   headers: {
  //     'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  //   },
  //   responseType: 'json',
  //   params: data
  // })
  // .then(function (response) {
  //   let data = response.data;
  //   if (data.rspCode === '000000') {
  //     callback(data);
  //   } else if (data.rspCode === '100009') {
  //     error && error()
  //   } else {
  //     error && error()
  //     alert('提示',data.rspDesc);
  //   }
  // })
  // .catch(function () {
  //   // alert('提示','喔唷，崩溃啦！');
  //   error && error()
  // });
};

http.get = (url) => {
  return new Promise((resolve, reject) => {
    $.getJSON(`/csc-administration${url}`, response => {
      resolve(response)
    })
  });
}

export let $http = http;
export let prompt = alert;
