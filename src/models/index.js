import BaseModel from './baseModel'

(async () => {
  await BaseModel.sync({ force: true });
})()
