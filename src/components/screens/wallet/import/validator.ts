import {validateMnemonic as isMnemonic} from 'bip39'
import {FieldValidator} from 'formik'

export const validateMnemonic: FieldValidator = value => {
  if (value === '') {
    return 'Required'
  }

  if (!isMnemonic(value.trim())) {
    return 'Invalid mnemonic'
  }
}
