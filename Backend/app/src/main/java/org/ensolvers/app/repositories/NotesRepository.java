package org.ensolvers.app.repositories;

import org.ensolvers.app.models.Notes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface NotesRepository extends JpaRepository<Notes, Long> {

    //@Query("SELECT n FROM Notes n WHERE n.user.id = :user_id")
    List<Notes> findByUserId( Long userId);
    List<Notes> findByTags_Name(String tagName);

    @Query("SELECT n FROM Notes n WHERE n.user.id = :userId AND n.archived = :archived")
    List<Notes> findByUserIdAndArchived(Long userId, boolean archived);

    @Query("SELECT n FROM Notes n JOIN n.tags t WHERE t.name = :tagName AND n.archived = :archived")
    List<Notes> findByTagAndArchive(String tagName, boolean archived);

}
