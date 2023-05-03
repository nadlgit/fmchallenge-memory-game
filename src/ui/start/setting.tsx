import { type ComponentPropsWithoutRef } from 'react';
import styles from './setting.module.css';

type SettingProps = {
  title: string;
  options: string[];
  initialOption?: string;
  onChange: (option: string) => void;
};

export const Setting = ({ title, options, initialOption, onChange }: SettingProps) => (
  <section>
    <h2 className={styles.title}>{title}</h2>
    <div className={`${styles.optiongroup} ${options.length > 2 ? styles.compact : styles.spread}`}>
      {options.map((item) => (
        <SettingOption
          key={item}
          id={transformString(item)}
          type="radio"
          name={transformString(title)}
          value={item}
          defaultChecked={item === initialOption}
          onChange={(e) => onChange(e.target.value)}
          className="visually-hidden"
        />
      ))}
    </div>
  </section>
);

const transformString = (str: string) => str.toLowerCase().replaceAll(' ', '_');

const SettingOption = (props: ComponentPropsWithoutRef<'input'>) => (
  <>
    <input {...props} />
    <label htmlFor={props.id}>{props.value}</label>
  </>
);
