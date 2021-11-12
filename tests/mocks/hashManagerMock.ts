export class HashManagerMock {
  public hash = (s: string): string => {
    return "hash";
  };


  public compare = (s: string, hash: string): boolean => {
    return s === hash;
  };

}
