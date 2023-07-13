      // 네비바 이동
      $('.a-community').click(function() {
        var url = 'http://grishare.ap-northeast-2.elasticbeanstalk.com/html/community.html';
        window.location.href = url;
    });
      $('.a-exchange').click(function() {
        var url = 'http://grishare.ap-northeast-2.elasticbeanstalk.com/html/exchangeRate.html';
        window.location.href = url;
    });
      $('.a-price').click(function() {
        var url = 'http://grishare.ap-northeast-2.elasticbeanstalk.com/html/pricecomparison.html';
        window.location.href = url;
    });
      $('.a-customer').click(function() {
        var url = 'http://grishare.ap-northeast-2.elasticbeanstalk.com/html/고객지원.html';
        window.location.href = url;
    });






$(document).ready(function() {
  $("#wrap_search_country").change(function() {
    var nationId = $(this).val();
    localStorage.setItem('nationId', nationId);
    if (nationId !== "") {
      window.location.href = 'http://grishare.ap-northeast-2.elasticbeanstalk.com/html/community_comment.html';

    }
  });
});

$(document).ready(function() {
  var nationId = localStorage.getItem('nationId');

  if (nationId) {
    var url = `http://grishare.ap-northeast-2.elasticbeanstalk.com/api/posts/${nationId}/info`;
    $.ajax({
      type: 'GET',
      dataType: 'json',
      url: url,
      success: function(data) {

        var $country_banner_box = $("<div>").attr("id", "country_banner_box");
        var $country_image = $("<img>").attr("id", "country_image").attr("src", data.data.imageUrl);
        
        var $country_good_img = $("<img>").attr("src", "../img/icon _thumbs up_.png").attr("id", "country_good_img").text("관심");
        var $country_good_likes = $("<span>").addClass("country_good_likes").text("관심 " + data.data.likes);

        
        
        $('#wrap_country_banner').append($country_banner_box);
        $country_banner_box.append($country_image);
        $('#wrap_country_banner').append($country_good_img);
        $('#wrap_country_banner').append($country_good_likes);
          
        

      }
    })}
});
  

$(document).ready(function() {
  var nationId = localStorage.getItem('nationId');

  if (nationId) {
    var url = `http://grishare.ap-northeast-2.elasticbeanstalk.com/api/posts/nation/${nationId}`;
    $.ajax({
      type: 'GET',
      dataType: 'json',
      url: url,
      success: function(data) {
        
        var postsByPostID = {};
        console.log('searchCountry_connecting');
        console.log(data);

        $.each(data.data, function(index, item) {
          var createdAt = new Date(item.created_at);
          var currentTime = new Date();
          var timeDiff = Math.floor((currentTime - createdAt) / (1000 * 60));
          var timeText = timeDiff + "분 전";
          
          var resultElement = $("<span>").text(timeText).addClass("time");
          

          var $postIcon = $('<div>').addClass('postIcon');
          var $userName = $('<div>').addClass('userName').text(item.userName);
      
          var $postContent = $('<div>').addClass('postContent').attr('spellcheck', 'false').text(item.contents);

          var $views = $('<div>').addClass('views');

  
          var $likes = $('<div>').addClass('likes').text(item.like_count);
          var $likes_image = $('<img>').attr("id", `likes_image${item.post_id}`).attr("src","../img/icon _heart_.png").addClass('likes_image');

          var $comment = $('<div>').addClass('comment').text(item.comment_count);
          var $comment_image = $('<div>').addClass('comment_image');
      
      
      
          var $scrap = $('<div>').addClass('scrap').text("스크랩");
          var $scrap_image = $('<img>').attr("id", `scrap_image${item.post_id}`).attr("src","../img/icon _star outline_.png").addClass('scrap_image');

          var $share = $("<div>").addClass("share").attr("id", `share${item.post_id}`).text("공유");
          var $share_image = $('<div>').attr("id", `share${item.post_id}`).addClass('share_image');

          var $report = $('<div>').attr("id", `report${item.post_id}`).addClass('report').text("신고");
        
            
          var $file_only = $('<img>').addClass('file_only').attr('src', item.imgUrl);
      
            
          if (!postsByPostID[item.post_id]) {
            postsByPostID[item.post_id] = $('<div>').addClass('post-container');
          }

          var $postContainer = $('<div>').addClass('post-container').attr('data-postid', item.post_id);


          $postContainer.append($postIcon).append(resultElement).append($userName).append($postContent).append($file_only).append($views).append($likes).append($likes_image).append($comment).append($comment_image).append($scrap).append($scrap_image).append($share).append($share_image).append($report).trigger("create");
        
          $('#wrap_country_box').append($postContainer);
          
        });

        //reply 창으로 넘기기
        $('#wrap_country_box').on('click', '.post-container', function(event) {
          var postid = $(event.target).attr("data-postid");

          localStorage.setItem('postid', postid);
          var is_clicked_post_container = localStorage.getItem('is_clicked_post_container');

          if (is_clicked_post_container === null) {
            is_clicked_post_container = '1';
          }
          
          if(is_clicked_post_container === '1'){
            is_clicked_post_container = '0';
            localStorage.setItem('is_clicked_post_container',is_clicked_post_container);
            var url = 'http://grishare.ap-northeast-2.elasticbeanstalk.com/html/community_comment.html';
            window.location.href = url;

          }else{
            is_clicked_post_container = '1';
            localStorage.setItem('is_clicked_post_container',is_clicked_post_container);
          }

        });


        //신고
        let is_clicked_report = false;

        $('.report').click(function(event) {
          
          var id_num = event.target.id.match(/\d+/)[0];
          var postId = id_num;
          event.stopPropagation();
        
          if (!is_clicked_report) {
            // var $overlay = $('<div>').addClass('overlay');
            // $('body').append($overlay);
            
            var $report_click = $('<div>').addClass('report_click').text("신고하기");
        
            $(`#report${id_num}`).append($report_click);
            is_clicked_report = true;

          } else {
            $(`#report${id_num}`).find('.report_click').remove();
            // $('.overlay').remove();
            is_clicked_report = false;
          }
          
          $.ajax({
            type: 'POST',
            dataType: 'json',
            url: `/api/posts/${postId}/report`,
            success: function(data) {
                console.log("report connecting");
            }});
  
        });
        
        $(document).on('click', '.report_click', function() {
          alert("신고되었습니다.");
          localStorage.setItem('is_clicked_report',"1");
          var url = 'http://grishare.ap-northeast-2.elasticbeanstalk.com/html/community_searchCountry.html';
        
          window.location.href = url;
        });
        

        // 좋아요
        let is_clicked_likes = false;

        $('.likes_image').click(function(event) {
          var id_num = event.target.id.match(/\d+/)[0];
          var postId = id_num;
          console.log(postId); // 이따 체크
          
          event.stopPropagation();

          if(!is_clicked_likes){
            $(`#likes_image${id_num}`).attr("src", "../img/icon _heart_red.png");
            is_clicked_likes = true;
          }else{
            $(`#likes_image${id_num}`).attr("src", "../img/icon _heart_.png");
            is_clicked_likes = false;
          }

          $.ajax({
          type: 'POST',
          dataType: 'json',
          url: `/api/posts/${postId}/like`,
          success: function(data) {
              console.log("like connecting");
              
              }
          });
        });

      
        //스크랩
        let is_clicked_scrap = false;
          
        $('.scrap_image').click(function(event){
          var id_num = event.target.id.match(/\d+/)[0];
          var postId = id_num;
          event.stopPropagation();

          if(!is_clicked_scrap){
            $(`#scrap_image${id_num}`).attr("src", "../img/icon _yellow_star outline_.png");
            is_clicked_scrap = true;
          }else{
            $(`#scrap_image${id_num}`).attr("src", "../img/icon _star outline_.png");
            is_clicked_scrap = false;
          }

          $.ajax({
            type: 'POST',
            dataType: 'json',
            url: `/api/posts/${postId}/scrap`,
            success: function(data) {
                console.log("scrap connecting");
              }})
        });

        
        // 공유
        let is_clicked_share = false;
        
        $(".share").click(function (event) {
          
          var id_num = event.target.id.match(/\d+/)[0];
          
          event.stopPropagation();

          if (!is_clicked_share) {
            var $share_image_instagram = $("<img>").attr("src","../img/instagram.png");
            var $share_image_facebook = $("<img>").attr("src", "../img/facebook.png");
            var $share_image_twitter = $("<img>").attr("src", "../img/twitter.png");
            var $share_image_kakao = $("<img>").attr("src", "../img/kakao.png");
            var $share_image_Vector = $("<img>").addClass("Vector").attr("src", "../img/Vector.png");
            var $share_link = $("<div>").addClass("share_link")
            // 링크 추가
            var $share_click = $("<div>").addClass("share_click");
            var $share_copy = $("<div>").addClass("share_copy").text("복사");
            var $share_emoji_box = $("<div>").addClass("share_emoji_box");
            $(`#share${id_num}`).append($share_click);
            $(".share_click").append($share_link);

            $(".share_link").append($share_copy);
            $(`#share${id_num}`).append($share_emoji_box);
            $(".share_emoji_box").append($share_image_instagram);
            $(".share_emoji_box").append($share_image_kakao);
            $(".share_emoji_box").append($share_image_twitter);
            $(".share_emoji_box").append($share_image_facebook);
            $(".share_emoji_box").append($share_image_Vector);
            is_clicked_share = true;
            // var $overlay = $('<div>').addClass('overlay');
            // $('body').append($overlay);

          } else {
            $(".share_click").remove();
            $(".share_emoji_box").remove();
            $(".share_link").remove();
            // $('.overlay').remove();
            is_clicked_share = false;
          }
        });
        $(".share_image").click(function (event) {
          var id_num = event.target.id.match(/\d+/)[0];
          event.stopPropagation();
          $(`#share${id_num}`).click();
        });
      


        
           }});
    }
  });

      