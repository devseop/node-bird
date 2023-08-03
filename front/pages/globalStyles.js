import { css } from "@emotion/react";

const globalStyles = css`
  @import url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/variable/pretendardvariable.css");
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: "Pretendard Variable", Pretendard, -apple-system,
      BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI",
      "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic",
      "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
  }

  .ant-card-head {
    padding: 0 !important;
    border: none !important;
  }

  .ant-card-body {
    padding: 0 !important;
    border-radius: 0;
  }

  .ant-card-actions {
    border-top: none !important;
  }

  .ant-card-actions > li {
    border: none !important;
    width: 44px !important;
  }
`;

export default globalStyles;
