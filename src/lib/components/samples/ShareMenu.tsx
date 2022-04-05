import {
  Button,
  Center,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  Text,
} from "@chakra-ui/react";
// import { AiOutlineShareAlt } from "react-icons/ai";
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
              url={window.location.href}
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
            <TelegramShareButton url={window.location.href} title={title}>
              <HStack>
                <Text>Telegram</Text>
                <FaTelegramPlane />
              </HStack>
            </TelegramShareButton>
          </Center>
          <br />
          <Center>
            <RedditShareButton url={window.location.href} title={title}>
              <HStack>
                <Text>Reddit</Text>
                <FaReddit />
              </HStack>
            </RedditShareButton>
          </Center>
          <br />
          <Center>
            <WhatsappShareButton url={window.location.href} title={title}>
              <HStack>
                <Text>WhatsApp</Text>
                <FaWhatsapp />
              </HStack>
            </WhatsappShareButton>
          </Center>
          <br />
          <Center>
            <FacebookShareButton
              url={window.location.href}
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
