layui.use(function() {
  let form = layui.form;
  let $ = layui.jquery;
  let captchaPath = '/auth/getCaptcha';
  let captcha_code_uuid = '';

  // 点击按钮更新验证码
  $('#captchaImage').click(function() {
    // 浏览器要发起图片验证码请求/captcha_code?captcha_code_uuid=xxxxx
    captcha_code_uuid = generateUUID();
    document.getElementById('captchaImage').src = captchaPath +
        '?captcha_code_uuid=' + captcha_code_uuid;
  });

  // 定时器，定时更新验证码
  setInterval(function() {
    captcha_code_uuid = generateUUID();
    document.getElementById('captchaImage').src = captchaPath +
        '?captcha_code_uuid=' + captcha_code_uuid;
  }, 50 * 1000);

  captcha_code_uuid = generateUUID();
  document.getElementById('captchaImage').src = captchaPath +
      '?captcha_code_uuid=' + captcha_code_uuid;

  async function login(data) {
    data['captcha_code_uuid'] = captcha_code_uuid;
    data['next'] = getUrlParam('next');
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    const response = await fetch('/login', options);
    return await response.json();
  }

  form.on('submit(login)', async function(data) {
    const result = await login(data.field);
    if (result.status === 'success') {
      layui.layer.msg(result.message);

      // 定时两秒之后跳转
      setInterval(function() {
        window.location.href = result.next ? result.next : '/';
      }, 2000);
    } else {
      layui.layer.msg(result.message);
    }
    return false;
  });
});