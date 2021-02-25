import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import mongoose from 'mongoose'

export default class AppProvider {
  public static needsApplication = true

  constructor(protected app: ApplicationContract) {}

  public register() {
    // Register your own bindings
  }

  public async boot() {
    const mongoUrlConnection =
      process.env.NODE_ENV === 'development' ? 'mongodb://localhost:27017/viana_server' : ''

    mongoose.connect(mongoUrlConnection, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
  }

  public async ready() {}

  public async shutdown() {
    // Cleanup, since app is going down
  }
}
