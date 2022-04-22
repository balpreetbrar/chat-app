
import "./MessageTile.css"
const MessageTile = (props) => {
  const { text, senderName } = props.message;

  return (<>

    <div className="msg">
      <div className={`bubble ${props.socketID === senderName ? 'sent' : 'received'}`}>
        <div className="txt">
          <span className="name">{senderName}</span>
          <span className="message">
            {text}
          </span>

        </div>

      </div>
    </div>
  </>)
}
export default MessageTile;