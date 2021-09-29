import { memo } from 'react';
import { Button, Content, Icon } from 'rsuite';

const About = memo(({ onShowUpdate }) => {
  return <Content className="content about">
    <Button onClick={onShowUpdate}>
      View Changelog
    </Button>

    <h2>Contact</h2>

    <a href="https://github.com/Queue-cs/Genshin">
      <Icon icon="github" size="2x" />&nbsp;
      Queue-cs/Genshin
    </a><br />

    <a href="https://twitter.com/QueueCs">
      <Icon icon="twitter" size="2x" />&nbsp;
      @QueueCs
    </a>

    <h2>Sources</h2>
    <div className="truncate">
      <a href="https://genshin-impact.fandom.com/">
        https://genshin-impact.fandom.com/
      </a>
      <br />
      <a href="https://github.com/theBowja/genshin-db">
        https://github.com/theBowja/genshin-db
      </a>
    </div>

  </Content>
})

export default About;