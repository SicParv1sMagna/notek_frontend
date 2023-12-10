import { useEffect, useState } from "react";
import { switchStyles as styles } from "../ui/switch";

const SwitchComponent: React.FC = () => {
    const [isChecked, setIsChecked] = useState(false);
  
    const handleInputChange = () => {
      if (!isChecked) {
        window.localStorage.setItem('theme', 'light');
        document.body.setAttribute('light', '');
        setIsChecked(true);
      } else {
        window.localStorage.setItem('theme', '');
        document.body.removeAttribute('light');
        setIsChecked(false);
      }
    }

    useEffect(() => {
      const theme = window.localStorage.getItem('theme');
      if (theme === 'light') {
        document.body.setAttribute('light', '')
        setIsChecked(true);
      } else {
        setIsChecked(false);
      }
    }, [])
  
    return (
      <label style={styles.switch} className="switch">
        <input
          type="checkbox"
          style={styles.switchInput}
          checked={isChecked}
          onChange={handleInputChange}
        />
        <span
          className={`slider ${styles.roundSlider ? 'round' : ''}`}
          style={{
            ...styles.slider,
            ...(isChecked ? styles.checkedSlider : {}),
          }}
        >
          <span
            style={{
              ...styles.sliderBefore,
              ...(isChecked ? styles.checkedSliderBefore : {}),
              ...(styles.roundSlider ? styles.roundSliderBefore : {}),
            }}
          />
        </span>
      </label>
    );
  };
  
  export default SwitchComponent;