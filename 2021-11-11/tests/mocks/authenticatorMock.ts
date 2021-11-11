import { UserRole } from "../../src/model/User.Model";
import { AuthenticationData } from "../../src/services/Authenticator";


export class AuthenticatorMock {
  public generateToken = (input: AuthenticationData): string => {
    return "token_mock"
  }

  public getData = jest.fn ((token: string) => {
    switch(token){
      case "token_normal":
        return {
          id: "id_mock",
          role: UserRole.NORMAL
        }
      case "token_admin":
        console.log(token);
        return {
          id: "id_mock",
          role: UserRole.ADMIN
        }
      default:
        return undefined
    }
    
  })
}