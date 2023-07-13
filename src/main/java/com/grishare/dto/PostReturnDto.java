package com.grishare.dto;

import com.grishare.domain.LikePost;
import com.grishare.domain.Post;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.format.DateTimeFormatter;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PostReturnDto {
    private Long post_id;
    private String title;
    private String contents;

    private String userName;
    private String create_at;
    private long views;
    private int like_count;
    private int comment_count;

    public PostReturnDto(Post post) {
        this.post_id = post.getId();
        this.title = post.getTitle();
        this.contents = post.getContent();
        this.userName = post.getUser().getNickName(); // 글쓰기 닉네임표시
        this.create_at = post.getCreatedAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
        this.views = post.getView();
        this.like_count = post.getLikePosts() == null ? 0 : post.getLikePosts().size();
        this.comment_count = post.getComments() == null ? 0 : post.getComments().size();
    }
}
