/* eslint-disable sonarjs/no-nested-template-literals */
import {
  Button,
  Center,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { BsShareFill } from "react-icons/bs";
import {
  FaTelegramPlane,
  FaReddit,
  FaTwitter,
  FaWhatsapp,
  FaFacebook,
} from "react-icons/fa";
import {
  TelegramShareButton,
  TwitterShareButton,
  RedditShareButton,
  WhatsappShareButton,
  FacebookShareButton,
} from "react-share";

export default function ShareMenu() {
  const router = useRouter();
  // Did this because window object may be undefined
  const url = `${
    process.env.NODE_ENV === "development"
      ? `http://localhost:3000${router.asPath}`
      : `https://seraph-app.vercel.app${router.asPath}`
  }`;
  const title = "Check out this awesome snippet on seraph-app.vercel.dev !";
  return (
    <div>
      <Menu>
        <MenuButton
          as={Button}
          alignSelf="flex-end"
          mt={4}
          backgroundColor="transparent"
          _active={{
            backgroundColor: "transparent",
          }}
          _hover={{
            backgroundColor: "transparent",
          }}
          _focus={{
            border: "none",
          }}
        >
          <BsShareFill />
        </MenuButton>
        <MenuList alignItems="center" zIndex={34}>
          <br />
          <Center>
            <TwitterShareButton
              url={url}
              title={title}
              hashtags={["seraph_app", "vercel", "nextjs", "react"]}
              related={["hunchodotdev"]}
            >
              <HStack>
                <Text>Twitter</Text>
                <FaTwitter />
              </HStack>
            </TwitterShareButton>
          </Center>
          <br />
          <Center>
            <TelegramShareButton url={url} title={title}>
              <HStack>
                <Text>Telegram</Text>
                <FaTelegramPlane />
              </HStack>
            </TelegramShareButton>
          </Center>
          <br />
          <Center>
            <RedditShareButton url={url} title={title}>
              <HStack>
                <Text>Reddit</Text>
                <FaReddit />
              </HStack>
            </RedditShareButton>
          </Center>
          <br />
          <Center>
            <WhatsappShareButton url={url} title={title}>
              <HStack>
                <Text>WhatsApp</Text>
                <FaWhatsapp />
              </HStack>
            </WhatsappShareButton>
          </Center>
          <br />
          <Center>
            <FacebookShareButton
              url={url}
              quote={title}
              hashtag="#seraph-app.vercel.app"
            >
              <HStack>
                <Text>Facebook</Text>
                <FaFacebook />
              </HStack>
            </FacebookShareButton>
          </Center>
          <br />
        </MenuList>
      </Menu>
    </div>
  );
}
