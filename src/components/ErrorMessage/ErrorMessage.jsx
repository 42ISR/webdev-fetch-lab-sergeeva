import './ErrorMessage.css';

function ErrorMessage({ message = 'Что-то пошло не так.' }) {
  return (
    <div className="error-message" role="alert">
      <p className="error-message__title">Ошибка</p>
      <p className="error-message__text">{message}</p>
    </div>
  );
}

export default ErrorMessage;