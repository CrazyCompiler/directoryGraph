'use strict';

//TODO: - app-store should get the details about the users home directory.
//TODO: - app-store should get the directory details from any directory.

import React from 'react';
import AppStore from '../AppStore';
import AppActions from '../../actions/AppActions';

describe('AppStore', function() {

  it('is configured to listen to actions', () =>  {
    expect(AppStore.listenables).toContain(AppActions);
  });

  it('should provide the details about the users home directory', function() {

  });

});

