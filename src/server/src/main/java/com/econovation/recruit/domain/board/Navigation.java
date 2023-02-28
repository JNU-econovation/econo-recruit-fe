package com.econovation.recruit.domain.board;

import lombok.*;

import javax.persistence.*;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class Navigation {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Integer id;
    @Column(name = "nav_title")
    private String navTitle;
    @Column(name = "nav_loc")
    private Integer navLoc;
}
