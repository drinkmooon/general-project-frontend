const waitTime = (time = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

async function getFakeCaptcha(req, res) {
  await waitTime(2000);
  return res.json('captcha-xxx');
} // 代码中会兼容本地 service mock 以及部署站点的静态数据

export default {
  // 支持值为 Object 和 Array
  'POST /api/user/login': async (req, res) => {
    const { password, id } = req.body;
    await waitTime(200);
    if (password == "test" && id == "test") {
      res.send({
        status: '200',
        currentAuthority: 'user',
      });
      return;
    }

    res.send({
      status: '403',
      currentAuthority: 'guest',
    });
  },
  'POST /api/register': (req, res) => {
    res.send({
      status: 'ok',
      currentAuthority: 'user',
    });
  },
};
