package com.ssafy.letcipe.domain.historyItem;

import com.ssafy.letcipe.domain.history.History;
import com.ssafy.letcipe.domain.recipe.Recipe;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Getter
@Table(uniqueConstraints = { @UniqueConstraint(columnNames = { "history_id", "recipe_id" }) })
public class HistoryItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne(targetEntity = History.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "history_id", referencedColumnName = "id")
    private History history;

    @ManyToOne(targetEntity = Recipe.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "recipe_id", referencedColumnName = "id")
    private Recipe recipe;

    @Column(name = "amount", nullable = false)
    private Integer amount;
}
