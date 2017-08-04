// in src/App.js
import React from 'react';
import { Admin, Resource } from 'admin-on-rest';
//import myRestClient from './Service/restClientMine'
import myRestClient from './service/restClientMine'
import ShotTraegerIcon from 'material-ui/svg-icons/action/list';

import { ShotTraegerList } from './resources/ShotTraeger';
import { ShotTraegerTitelShotlistList, ShotTraegerTitelShotlistShow } from './resources/ShotTraegerTitelShotlist';
import { ShotTimecodesList, ShotTimecodesShow } from './resources/ShotTimecodes';
import { Dashboard } from './service/Dashboard';
import { authClient } from './service/authClient';


const App = () => (
    <Admin
          dashboard={Dashboard}
          authClient={authClient}
          restClient={myRestClient}>
        <Resource name="ShotTraeger" list={ShotTraegerList}  icon={ShotTraegerIcon} />
        <Resource name="ShotTraegerTitelShotlist" list={ShotTraegerTitelShotlistList}
            show={ShotTraegerTitelShotlistShow} icon={ShotTraegerIcon} />
        <Resource name="ShotTimecodes" list={ShotTimecodesList}  show={ShotTimecodesShow}
          icon={ShotTraegerIcon} />

    </Admin>
);

export default App;
