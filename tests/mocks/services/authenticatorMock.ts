import { UserRole } from "../../../src/model/User.Model";
import { AuthenticationData } from "../../../src/services/Authenticator";


export class AuthenticatorMock {
  public generateToken = (input: AuthenticationData): string => {
    switch(input.id){
      case "id_user_1":
        return "token_normal"
      case "id_user_2":
        return "token_admin"
      default:
        return ""
    }
  }

  public getData = jest.fn ((token: string) => {
    switch(token){
      case "token_normal":
        return {
          id: "id_mock",
          role: UserRole.NORMAL
        }
      case "token_admin":
        return {
          id: "id_mock",
          role: UserRole.ADMIN
        }
      default:
        return undefined
    }
    
  })
}