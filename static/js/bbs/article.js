// 文章评论请求
async function article_comment(data) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
  const response = await fetch('/article/article_comment', options);
  return await response.json();
}

// 关注用户请求
async function followed_user(data) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
  const response = await fetch('/article/followed_user', options);
  return await response.json();
}

// 收藏文章请求
async function article_collect(data) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
  const response = await fetch('/article/article_collect', options);
  return await response.json();
}

$(function() {
  let url = window.location.href.split('?')[0].split('/');
  const article_id = url[url.length - 1];

  // 收藏
  $('.collection').click(async function() {
    const params = {
      // 提取操作(收藏/取消收藏)
      // 操作的文章id
      article_id: article_id,
      action: 'collect',
    };
    const result = await article_collect(params);
    if (result.code === 0) {
      // 收藏成功
      // 隐藏收藏按钮
      $('.collection').hide();
      // 显示取消收藏按钮
      $('.collected').show();
    } else if (result.code === 4101) {
      // 如果服务器返回的状态码是 4101 就表示没有登录
      window.location.href = '/login';
    } else {
      alert(result.message);
    }
  });

  // 取消收藏
  $('.collected').on({
    mouseover: function() {
      $(this).find('.out').hide();
      $(this).find('.over').show();
    },
    mouseout: function() {
      $(this).find('.out').show();
      $(this).find('.over').hide();
    },
    click: async function() {
      const params = {
        'article_id': article_id,
        'action': 'cancel_collect',
      };
      const result = await article_collect(params);
      if (result.code === 0) {
        // 收藏成功
        // 隐藏收藏按钮
        $('.collection').show();
        // 显示取消收藏按钮
        $('.collected').hide();
      } else if (result.code === 4101) {
        window.location.href = '/login';
      } else {
        alert(result.message);
      }
    },
  });

  // 评论提交(一级)
  $('.comment_form').submit(async function(e) {
    e.preventDefault();
    const news_comment = $('.comment_input').val();

    if (!news_comment) {
      alert('请输入评论内容');
      return;
    }
    let params = {
      'article_id': article_id,
      'comment': news_comment,
    };
    const result = await article_comment(params);
    if (result.success === true) {
      // 如果提交评论成功,动态加载评论 location.reload()
      // 如果有动态加载的,前后端必须统一
      window.location.reload();
    } else {
      alert(result.message);
    }
  });

  // 显示回复表单
  $('.comment_reply').click(function() {
    $(this).parents('.comment-details').next().toggle();
  });

  // 影藏回复表单
  $('.reply_cancel').click(function() {
    $(this).parents('.reply_form').toggle();
  });

  // 回复评论 二级
  $('.reply_sub').click(async function(e) {
    e.preventDefault();
    // 获取点击的元素
    const parent_id = $(this).parents('form').attr('data-commentid');
    const comment = $(this).parent().siblings('.reply_input').val();

    if (!comment) {
      alert('请输入评论内容');
      return;
    }

    const params = {
      'article_id': article_id,
      'comment': comment,
      'parent_id': parent_id,
    };
    console.log(params);
    const result = await article_comment(params);
    if (result.success === 'success') {
      window.location.reload();
    } else {
      console.log(result.message);
    }
  });

  // 实现点赞逻辑
  $('.comment_up').click(function() {
    let action = 'add';

    if ($(this).hasClass('has_comment_up')) {
      // 如果当前该评论已经是点赞状态，再次点击会进行到此代码块内，代表要取消点赞
      action = 'remove';
    }

    const comment_id = $(this).
        parents('.comment-details').
        siblings('.reply_form').
        attr('data-commentid');
    const params = {
      'comment_id': comment_id,
      'action': action,
      'article_id': article_id,
    };

    $.ajax({
      url: '/article/comment_like',
      type: 'post',
      contentType: 'application/json',
      data: JSON.stringify(params),
      success: function(resp) {
        if (resp.code === 0) {
          window.location.reload();
        } else if (resp.code === 4101) {
          window.location.href = '/login';
        } else {
          alert(resp.message);
        }
      },
    });
  });

  // 关注当前新闻作者
  $('.focus').click(async function() {
    const user_id = $(this).attr('data-userid');
    const params = {
      'action': 'follow',
      'user_id': user_id,
    };
    const result = await followed_user(params);
    if (result.code === 0) {
      window.location.reload();
    } else if (result.code === 4101) {
      window.location.href = '/login';
    } else {
      // 关注失败
      layui.layer.msg(result.message);
    }
  });

  // 取消关注当前新闻作者
  $('.focused').click(async function() {
    const user_id = $(this).attr('data-userid');
    const params = {
      'action': 'unfollow',
      'user_id': user_id,
    };
    const result = await followed_user(params);
    if (result.code === 0) {
      window.location.reload();
    } else if (result.code === 4101) {
      window.location.href = '/login';
    } else {
      // 取消关注失败
      layui.layer.msg(result.message);
    }
  });

});