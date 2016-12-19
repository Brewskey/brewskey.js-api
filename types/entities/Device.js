// @flow
declare module 'brewskey.js-api' {
  declare type Device = {
    createdBy: {
      id: string,
      userName: string,
    },
    deviceStatus: string,
    id: number,
    isDeleted: boolean,
    isMultiTap: boolean,
    lastEdited: string,
    lastEditedBy: {
      id: string,
      userName: string,
    },
    name: string,
    particleId: string,
    temperature: number,
  };
}
