import React from 'react';

type Props = {
  message: string;
};

export default function ErrorMessage({ message }: Props) {
  return (
    <div
      className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
      role="alert"
    >
      <strong className="font-bold">Oups there is an error </strong>
      <span className="block sm:inline">{message}</span>
    </div>
  );
}
