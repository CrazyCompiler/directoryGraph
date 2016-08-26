'use strict';

//TODO: - app-store should get the details about the users home directory.
//TODO: - app-store should get the directory details from any directory.
import React from 'react';
import AppStore from '../AppStore';
import AppActions from '../../actions/AppActions';
import _ from 'underscore'
import os from 'os';
import sinon from 'sinon';

describe('AppStore', function() {

  it('is configured to listen to actions', () =>  {
    expect(AppStore.listenables).toContain(AppActions);
  });

  it('should provide the details about the users home directory, if no directory provided', function() {
      var spy = sinon.spy(os, "homedir");
      let subscription = AppStore.listen((payload) => {
            expect(payload.action).toBe("directoryDetails");
            expect(payload.data).not.toBeNull;
            expect(spy.called).toBeTruthy();
      });

      AppStore.onGetDirectoryDetails();
    });
    it('should provide the details about the directory provided', function() {
      mkdir('demoTestDirectory');
      let subscription = AppStore.listen((payload) => {
            let demoDirectory = _.find(payload.data,(element) => {
                return element.name == 'demoTestDirectory';
            });
            expect(payload.action).toBe("directoryDetails");
            expect(payload.data).not.toBeNull;
            expect(demoDirectory.name).toBe('demoTestDirectory');
            rm('-rf','demoTestDirectory');
      });

      AppStore.onGetDirectoryDetails('./');
    })
});

