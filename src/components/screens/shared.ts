import {NavigationProp, ParamListBase, RouteProp} from '@react-navigation/core'

export interface IScreenProps<T = undefined> {
  navigation: NavigationProp<ParamListBase>
  route: RouteProp<ParamListBase, string> & {params: T}
}
