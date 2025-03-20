package com.launchcode.dama_devs.repositories;

import com.launchcode.dama_devs.models.AppRole;
import com.launchcode.dama_devs.models.Role;
import org.springframework.data.repository.CrudRepository;

public interface RoleRepository extends CrudRepository<Role, Long> {
    Role findByRoleName(AppRole appRole);

}
