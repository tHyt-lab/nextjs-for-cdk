import { useCallback } from "react";

import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
} from "@azure/msal-react";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";

import ClLogo from "@/components/ClLogo";
import { loginRequest } from "@/lib/auth/msalConfig";
import AadIcon from "public/azure-active-directory.svg";

export default function Home(): JSX.Element {
  const { instance, accounts } = useMsal();

  const login = useCallback(async () => {
    await instance.loginRedirect(loginRequest);
  }, [instance]);

  const logout = useCallback(() => {
    localStorage.clear();
    location.reload();
  }, []);

  return (
    <>
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ py: 5 }}>
          <Stack spacing={5} alignItems="center">
            <ClLogo width={100} height={100} />
            <Typography variant="h3">ConsalLink Portal Site</Typography>
            <Box>
              <UnauthenticatedTemplate>
                <Button>
                  <Link href="/dashboard">dashboard</Link>
                </Button>
                <Button
                  variant="outlined"
                  sx={{
                    borderRadius: "3em",
                    textTransform: "none",
                  }}
                  onClick={login}
                  startIcon={<AadIcon width="1em" height="1em" />}
                >
                  Azure ADでログイン
                </Button>
              </UnauthenticatedTemplate>
              <AuthenticatedTemplate>
                {accounts.length > 0 && (
                  <Box textAlign={"center"}>
                    <p>Authenticated</p>
                    <p>Hello {accounts[0].name}</p>
                    <Button>
                      <Link href="/dashboard">dashboard</Link>
                    </Button>
                    <Button
                      variant="contained"
                      onClick={logout}
                      startIcon={<LogoutIcon />}
                    >
                      logout
                    </Button>
                  </Box>
                )}
              </AuthenticatedTemplate>
            </Box>
          </Stack>
        </Paper>
      </Container>
    </>
  );
}
