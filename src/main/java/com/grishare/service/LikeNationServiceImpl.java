package com.grishare.service;

import com.grishare.domain.LikeNation;
import com.grishare.domain.LikePost;
import com.grishare.domain.Nation;
import com.grishare.domain.Post;
import com.grishare.domain.user.User;
import com.grishare.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LikeNationServiceImpl implements LikeNationService{

    private final LikeNationRepository likeNationRepository;
    private final UserRepository userRepository;
    private final NationRepository nationRepository;

    @Override
    public void addLike(String userLoginId, Long nationId){
        Nation nation = nationRepository.findById(nationId).orElse(null);
        User loginUSer = userRepository.findByUserLoginId(userLoginId).orElse(null);
        LikeNation likeNation = new LikeNation(nation,loginUSer);
        likeNationRepository.save(likeNation);
        System.out.println("국가조아요아이디! = " + likeNation.getId());
    }

    @Override
    public void deleteLike(String userLoginId, Long nationId){
        User loginUser = userRepository.findByUserLoginId(userLoginId).orElse(null);
        LikeNation likeNation = likeNationRepository.findByNationIdAndUserId(nationId,loginUser.getId()).orElse(null);

        likeNationRepository.delete(likeNation);
    }
    @Override
    public Boolean checkLike(String userLoginId, Long nationId){
        User loginUser = userRepository.findByUserLoginId(userLoginId).orElse(null);
        return likeNationRepository.findByNationIdAndUserId(nationId,loginUser.getId())
                .isPresent();
    }
    @Override
    public void updateOfLikeNation(Long nationId, User user){
        if(!checkLike(user.getUserLoginId(),nationId)) {
            addLike(user.getUserLoginId(), nationId);

        }else {
            deleteLike(user.getUserLoginId(), nationId);
        }
    }
}
