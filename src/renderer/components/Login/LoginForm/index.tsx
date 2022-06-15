import React from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { InputAdornment, Grid } from '@mui/material'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import { get } from 'lodash'

import Input from 'renderer/components/Form/Input'
import InputPassword from 'renderer/components/Form/InputPassword'
import { EmailRules, PasswordLoginRules } from 'renderer/components/Form/validation'
import Form from 'renderer/components/Form/form'
import withForm from 'renderer/components/Form/withForm'
import { Link } from 'renderer/components/Link'
import { useSubmitDisable } from 'renderer/components/Form/hooks'
import { commonContents } from 'renderer/contents/common'
import { loginContents } from 'renderer/contents/screens/login'
import { AuthLogin } from 'renderer/types/accounts'
import { updateLogin } from 'renderer/api/account'
import { showSnackBar, SnackbarType } from 'renderer/components/SnackbarCustom'
import { getErrorMessage, getSuccessMessage } from 'renderer/lib/http'
import { updateAuthToken } from 'renderer/lib/storage'
import { InputContainer, LoginButton, TitleWrapper, Title, Underline, Wrapper, FooterWrap } from './index.styled'
import { ROUTE_PATH } from 'renderer/types/route'
import { BSportalUrl } from 'renderer/constants/url'

function LoginForm() {
  const queryClient = useQueryClient()
  const isDisabled = useSubmitDisable()
  const loginMutation = useMutation(updateLogin)
  const navigate = useNavigate()

  const handleSubmit = async (data: AuthLogin) => {
    await loginMutation.mutateAsync(data, {
      onError: (error: unknown) => {
        showSnackBar(queryClient, {
          message: getErrorMessage(error),
          type: SnackbarType.ERROR,
        })
        navigate(ROUTE_PATH.organization)
      },

      onSuccess: (response) => {
        updateAuthToken(get(response, 'data.data.token'))
        showSnackBar(queryClient, {
          message: getSuccessMessage(response),
          type: SnackbarType.SUCCESS,
        })
        navigate(ROUTE_PATH.organization)
      },
    })
  }
  return (
    <Wrapper>
      <TitleWrapper>
        <Title>{commonContents.signIn}</Title>
        <Underline />
      </TitleWrapper>
      <Form onFormSubmit={handleSubmit}>
        <InputContainer>
          <Input
            name='email'
            rules={EmailRules}
            className='emailInput'
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <MailOutlineIcon className='mailIcon' />
                </InputAdornment>
              ),
            }}
            placeholder={commonContents.emailId}
            fullWidth
          />
        </InputContainer>
        <InputContainer>
          <InputPassword
            name='password'
            rules={PasswordLoginRules}
            placeholder={commonContents.password}
            className='passwordInput'
            fullWidth
          />
        </InputContainer>
        <Grid container justify='flex-end'>
          <Link to={BSportalUrl.resetPassword} underline='none'>
            {loginContents.forgotPassword}
          </Link>
        </Grid>
        <LoginButton type='submit' color='primary' disabled={isDisabled || loginMutation.isLoading} fullWidth>
          {commonContents.login}
        </LoginButton>
      </Form>
      <FooterWrap>
        {loginContents.createAccount} &nbsp;
        <Link to={BSportalUrl.register} className='registerLink' underline='none'>
          {commonContents.signUp}
        </Link>
      </FooterWrap>
    </Wrapper>
  )
}

export default withForm(LoginForm)
