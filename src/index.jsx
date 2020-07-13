import ForgeUI, {
  render,
  Fragment,
  Macro,
  Text,
  Image,
  Button,
  TextArea,
  Code,
  ConfigForm,
  useConfig,
  useState,
} from "@forge/ui";
import * as js2flowchart from "js2flowchart";

const App = () => {
  const config = useConfig();
  const svg = js2flowchart.convertCodeToSvg(config.code);

  const [showCode, setShowCode] = useState(false);
  const [btnTitle, setBtnTitle] = useState("View code");

  return (
    <Fragment>
      {showCode ? (
        <Code text={config.code} language="javascript" />
      ) : (
        <Image
          src={`data:image/svg+xml;utf8,${encodeURIComponent(svg)}`}
          alt="diagram"
        />
      )}
      <Button
        text={btnTitle}
        onClick={function () {
          setShowCode(!showCode);
          if (showCode) {
            setBtnTitle("View code");
          } else {
            setBtnTitle("View flowchart");
          }
        }}
      />
    </Fragment>
  );
};

const Config = () => {
  return (
    <ConfigForm>
      <TextArea label="Enter Javascript code" name="code" />
    </ConfigForm>
  );
};

export const run = render(
  <Macro
    app={<App />}
    config={<Config />}
    defaultConfig={{
      code: "",
    }}
  />
);
