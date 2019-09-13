import {useCallback} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {BALANCE_OF} from 'src/const'
import {accountSelector} from 'src/redux/module/account'
import {
  entityAction,
  entitySelector,
  entityType,
  entityUtil,
} from 'src/redux/module/entity'
import {ITokenManager} from 'src/redux/module/token/type'

export function useTokenManager() {
  const accounts = useSelector(entitySelector.getAccounts)
  const currentAccount = useSelector(
    accountSelector.getCurrentAccount,
  ) as entityType.IAccount
  const dispatch = useDispatch()

  const addToken = useCallback<ITokenManager['addToken']>(
    tokenCandidate => {
      const t = entityUtil.createToken({
        accountAddress: currentAccount.address,
        address: tokenCandidate.address,
        decimals: tokenCandidate.decimals,
        name: tokenCandidate.name,
        symbol: tokenCandidate.symbol,
      })
      dispatch(entityAction.setToken(t))
      dispatch(
        entityAction.setAccount({
          ...currentAccount,
          tokenAddresses: [...currentAccount.tokenAddresses, t.address],
        }),
      )
    },
    [currentAccount, dispatch],
  )

  const removeToken = useCallback<ITokenManager['removeToken']>(
    token => {
      const a = accounts[token.accountAddress]
      dispatch(
        entityAction.setAccount({
          ...a,
          tokenAddresses: a.tokenAddresses.filter(
            item => item !== token.address,
          ),
        }),
      )
      dispatch(entityAction.removeToken(token.address))
    },
    [accounts, dispatch],
  )

  const fetchTokenBalance = useCallback<ITokenManager['fetchTokenBalance']>(
    async (token, web3) => {
      const res = await web3.eth.call({
        data: BALANCE_OF + token.accountAddress.slice(2),
        to: token.address,
      })
      const balance = parseInt(res, 8).toString()
      dispatch(
        entityAction.setToken({
          ...token,
          balance,
        }),
      )
    },
    [dispatch],
  )

  return {addToken, fetchTokenBalance, removeToken}
}
