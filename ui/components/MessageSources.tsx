import { Document } from "@langchain/core/documents";
import { Fragment, useState } from "react";
import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";

const MessageSources = ({ sources }: { sources: Document[] }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  function closeModal() {
    setIsDialogOpen(false);
    document.body.classList.remove("overflow-hidden-scrollable");
  }

  function openModal() {
    setIsDialogOpen(true);
    document.body.classList.add("overflow-hidden-scrollable");
  }
  return (
    <div className="grid gridc-cols-2 lg:grid-cols-4 gap-2">
      {sources.slice(0, 3).map((source, i) => (
        <a
          href={source.metadata.url}
          key={i}
          target="_blank"
          className="bg-[#111111] hover:bg-[#1c1c1c] transition duration-200 rounded-lg p-3 flex flex-col space-y-2 font-medium"
        >
          <p className="text-white text-xs overflow-hidden whitespace-nowrap text-ellipsis">
            {source.metadata.title}
          </p>
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row items-center space-x-1">
              <img
                src={`https://s2.googleusercontent.com/s2/favicons?domain_url=${source.metadata.url}`}
                width={16}
                height={16}
                alt="favicon"
                className="rounded-lg h-4 w-4"
                key={i}
              />
              <p className="text-xs text-white/50 overflow-hidden whitespace-nowrap text-ellipsis">
                {source.metadata.url.replace(/.+\/\/|www.|\..+/g, "")}
              </p>
            </div>
            <div className="flex flex-row items-center space-x-1 text-white/50 text-xs">
              <div className="bg-white/50 h-[4px] w-[4px] rounded-full"></div>
              <span>{i + 1}</span>
            </div>
          </div>
        </a>
      ))}
      {sources.length > 3 && (
        <button
          onClick={openModal}
          className="
      bg-[#111111] hover:bg-[#1c1c1c] transition duration-200 rounded-lg px-4 py-2 flex flex-col justify-between space-y-2"
        >
          <div className="flex flex-row items-center space-x-1">
            {sources.slice(3, 6).map((source, i) => (
              <img
                src={`https://s2.googleusercontent.com/s2/favicons?domain_url=${source.metadata.url}`}
                width={16}
                height={16}
                alt="favicon"
                className="rounded-lg h-4 w-4"
                key={i}
              />
            ))}
          </div>
          <p className="text-xs text-white/50">
            View {sources.length - 3} more
          </p>
        </button>
      )}
      <Transition appear show={isDialogOpen} as={Fragment}>
        <Dialog as="div" className={"relative z-50"} onClose={closeModal}>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-200"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-100"
                leaveFrom="opacity-100 scale-200"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  className={
                    "w-full max-w-md transform rounded-2xl bg-[#111111] border border-[#1c1c1c] p-6 text-left align-middle shadow-xl transition-all"
                  }
                >
                  <Dialog.Title
                    className={"text-lg font-medium leading-6 text-white"}
                  >
                    Sources
                  </Dialog.Title>
                  <div className="grid grid-cols-2 gap-2 overflow-auto max-h-[300px] mt-2 pr-2">
                    {sources.map((source, i) => (
                      <a
                        href={source.metadata.url}
                        key={i}
                        target="_blank"
                        className="bg-[#111111] hover:bg-[#1c1c1c] transition duration-200 rounded-lg p-3 flex flex-col space-y-2 font-medium"
                      >
                        <p className="text-white text-xs overflow-hidden whitespace-nowrap text-ellipsis">
                          {source.metadata.title}
                        </p>
                        <div className="flex flex-row items-center justify-between">
                          <div className="flex flex-row items-center space-x-1">
                            <img
                              src={`https://s2.googleusercontent.com/s2/favicons?domain_url=${source.metadata.url}`}
                              width={16}
                              height={16}
                              alt="favicon"
                              className="rounded-lg h-4 w-4"
                              key={i}
                            />
                            <p className="text-xs text-white/50 overflow-hidden whitespace-nowrap text-ellipsis">
                              {source.metadata.url.replace(
                                /.+\/\/|www.|\..+/g,
                                ""
                              )}
                            </p>
                          </div>
                          <div className="flex flex-row items-center space-x-1 text-white/50 text-xs">
                            <div className="bg-white/50 h-[4px] w-[4px] rounded-full"></div>
                            <span>{i + 1}</span>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default MessageSources;
