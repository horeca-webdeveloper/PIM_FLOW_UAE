import React, { useState, useEffect } from "react";
import CommonInput from "../../../common/MultiAttributes/CommonInput";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { Editor, EditorProvider } from "react-simple-wysiwyg";
import CommonSearchDropDown from "../../../common/MultiAttributes/CommonSearchDropDown";
import {
  useAiFaqPath,
  useAiFeaturesAndBenefitsPath,
  useAiReviewsPath,
} from "../../../../services/apis/FAQ/Hooks";
import toast from "react-hot-toast";
import Loader from "../../../../utils/Loader";

const Marketing = ({
  marketing,
  setMarketing,
  data,
  customerReviews,
  setCustomerReviews,
}) => {
  const [show, setShow] = useState(true);
  const [features, setFeatures] = useState("");
  const [loader, setLoader] = useState(false);
  const [reviewLoader, setReviewLoader] = useState(false);
  const [Benefitloader, setBenefitLoader] = useState(false);

  const addCustomerReview = () => {
    setCustomerReviews((prevReviews) => [
      ...prevReviews,
      {
        review_customer_name: "",
        review_customer_email: "",
        review_star: "",
        review_images: [],
        review_comment: "",
        review_status: 1,
      },
    ]);
  };

  const handleReviewChange = (index, field, value) => {
    setCustomerReviews((prevReviews) =>
      prevReviews.map((review, i) =>
        i === index ? { ...review, [field]: value } : review
      )
    );
  };

  const handleFileChange = (index, event) => {
    const files = Array.from(event.target.files);
    Promise.all(
      files.map((file) => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.readAsDataURL(file);
        });
      })
    ).then((newImages) => {
      setCustomerReviews((prevReviews) =>
        prevReviews.map((review, i) =>
          i === index
            ? {
                ...review,
                review_images: [...review.review_images, ...newImages], // ✅ Correctly updating `review_images`
              }
            : review
        )
      );
    });
  };

  // FAQ Starts Here
  const [faqs, setFaqs] = useState(
    data || [{ question: "", answer: "", category_id: 2, status: 1 }]
  );

  useEffect(() => {
    setMarketing((prev) => ({
      ...prev,
      content: prev.content || Array(5).fill(""),
      Benefits: prev.Benefits || Array(5).fill(""),
    }));
  }, []);

  useEffect(() => {
    setMarketing((prev) => ({
      ...prev,
      faqs: faqs, // ✅ Ensure faqs updates in marketingData
    }));
  }, [faqs, setMarketing]);

  const { mutate, isLoading, isError } = useAiFaqPath();

  const AiFaq = (input) => {
    if (features.length == 0) {
      toast.error("Please write something in Features Box");
      return null;
    }
    setLoader(true);
    const inputData = { product_description: input };
    mutate(inputData, {
      onSuccess: (aiFaqData) => {
        setLoader(false);
        // Extract question & answer from first API
        console.log(data);
        const formattedFirstFaqApi = data.map(({ question, answer }) => ({
          question,
          answer,
          category_id: 2,
          status: 1,
        }));

        // Extract question & answer from second API
        const formattedSecondFaqApi =
          aiFaqData?.faqs?.map(({ question, answer }) => ({
            question,
            answer,
            category_id: 2,
            status: 1,
          })) || [];

        // Merge both responses
        const mergedFaqs = [...formattedSecondFaqApi, ...formattedFirstFaqApi];
        console.log("merged faqs", mergedFaqs);
        setFaqs(mergedFaqs);
      },
      onError: (err) => {
        console.log(err);
      },
    });
  };

  const {
    mutate: benefitsFeatures,
    isLoading: benefitLoading,
    isError: benefitsLoading,
  } = useAiFeaturesAndBenefitsPath();

  const benefitsAndFeature = (input) => {
    if (features.length == 0) {
      toast.error("Please write something in Features Box");
      return null;
    }
    setBenefitLoader(true);
    const inputData = { product_description: input };
    benefitsFeatures(inputData, {
      onSuccess: (aiBenefitsFeatureData) => {
        setBenefitLoader(false);
        const data = aiBenefitsFeatureData;
        setMarketing((prev) => ({
          ...prev,
          apiBenefits: data.benefits_features, // Store entire array
        }));
      },
      onError: (err) => {
        console.log(err);
        setBenefitLoader(false);
      },
    });
  };

  const handleAdd = () => {
    setMarketing((prev) => ({
      ...prev,
      apiBenefits: [...prev.apiBenefits, { benefit: "", feature: "" }], // Add new empty benefit
    }));
  };

  const handleRemove = (index) => {
    setMarketing((prev) => ({
      ...prev,
      apiBenefits: prev.apiBenefits.filter((_, i) => i !== index), // Remove only from apiBenefits
    }));
  };

  const {
    mutate: AiReview,
    isLoadin: AireviewLoading,
    isError: AireviewError,
  } = useAiReviewsPath();

  const AiReviews = (input) => {
    if (features.length == 0) {
      toast.error("Please write something in Features Box");
      return null;
    }
    setReviewLoader(true);
    const inputData = { product_description: input };

    AiReview(inputData, {
      onSuccess: (aiBenefitsFeatureData) => {
        setReviewLoader(false);
        if (aiBenefitsFeatureData?.reviews?.length) {
          setCustomerReviews((prevReviews) => [
            ...prevReviews,
            ...aiBenefitsFeatureData.reviews.map((review) => ({
              review_customer_name: review.customer_name,
              review_customer_email: review.customer_email,
              review_star: review.stars || "",
              review_images: review.review_images || [],
              review_comment: review.comment || "",
              review_status: review.review_status ?? 1,
            })),
          ]);
        }

        setLoader(false);
      },
      onError: (err) => {
        console.log(err);
        setLoader(false);
      },
    });
  };

  const handleInputChange = (index, field, value) => {
    setMarketing((prev) => ({
      ...prev,
      apiBenefits: prev.apiBenefits.map((item, idx) =>
        idx === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const addFaq = () => {
    setFaqs([...faqs, { question: "", answer: "" }]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMarketing((prev) => ({ ...prev, [name]: value }));
  };
  // FAQ Ends Here

  return (
    <EditorProvider>
      <div className=" border border-[#979797]  rounded-lg p-0 bg-white shadow-sm mt-[20px]">
        <div
          onClick={() => setShow(!show)}
          className={`flex cursor-pointer rounded-t-md h-[49px] border-b-2 border-b-[#979797] bg-[#F9F9FB] px-4 justify-between items-center ${
            show ? "mb-4" : "mb-0"
          }`}
        >
          <h2 className="text-[20px] text-[#4A4A4A] leading-[27.28px] font-normal">
            Marketing Attributes
          </h2>
        </div>
        {show && (
          <div className="w-[100%] p-4">
            <div className="mb-4">
              <CommonInput
                label={"Name"}
                name={"name"}
                placeholder={marketing?.name}
                value={marketing?.name}
                className={"100%"}
                onChange={handleChange}
              />

              <label className="block text-gray-700 mb-2">
                Product Description
              </label>
              <Editor
                value={marketing?.description}
                onChange={(e) => {
                  const text = e.target.value;

                  // Insert a new paragraph (`\n\n`) after every 100 characters
                  const formattedText = text
                    .match(/.{1,50}/g) // Split into chunks of 100 characters
                    ?.join("\n\n\n\n\n"); // Join with double new lines (paragraphs)

                  setMarketing((prev) => ({
                    ...prev,
                    description: formattedText,
                  }));
                }}
                toolbar={[
                  "bold",
                  "italic",
                  "underline",
                  "strike",
                  "orderedList",
                  "unorderedList",
                  "link",
                  "image",
                  "undo",
                  "redo",
                ]}
              />
              <div className="flex flex-col gap-0">
                <label className="block text-gray-700 mt-[10px]">
                  Ai Prompt
                </label>
                <textarea
                  className="border p-[10px] border-[#A8A4A4] rounded-md"
                  rows="5"
                  value={features}
                  onChange={(e) => setFeatures(e.target.value)}
                  cols="50"
                  placeholder="Enter your text here..."
                ></textarea>

                <div className="flex  items-center justify-between">
                  <label className="block text-gray-700 mt-[10px]">
                    Benefits & Features
                  </label>
                  <button
                    onClick={() => benefitsAndFeature(features)}
                    className="mt-[15px] rounded bg-[#26683A] text-[14px] cursor-pointer text-white ml-[20px] border px-[10px] p-[4px] mb-[10px]"
                  >
                    Generate Benefits & Features
                  </button>
                </div>
                <div className="w-[100%] border border-[#A8A4A4] border-dotted p-[10px] mb-[15px] mt-[5px] rounded-md">
                  <div className="grid grid-cols-3 gap-4 mb-2">
                    <label className="text-[16px] font-medium text-[#616161]">
                      Benefits
                    </label>
                    <label className="text-[16px] col-span-2 font-medium text-[#616161]">
                      Features
                    </label>
                  </div>

                  {Benefitloader == false ? (
                    marketing?.apiBenefits?.map((item, index) => (
                      <div
                        key={index}
                        className="grid grid-cols-3 gap-4 mt-2 items-center"
                      >
                        <div className="relative">
                          <input
                            type="text"
                            value={item.benefit || ""}
                            maxLength={40}
                            onChange={(e) =>
                              handleInputChange(
                                index,
                                "benefit",
                                e.target.value
                              )
                            }
                            className="border border-gray-300 p-2 rounded w-full"
                            placeholder="Max Characters Allowed 40"
                          />
                        </div>
                        <div className="relative flex gap-2 col-span-2">
                          <input
                            type="text"
                            maxLength={200}
                            value={item.feature || ""}
                            onChange={(e) =>
                              handleInputChange(
                                index,
                                "feature",
                                e.target.value
                              )
                            }
                            className="border border-gray-300 p-2 rounded w-full"
                            placeholder="Max Characters Allowed 200"
                          />
                          <div className="flex gap-2 shrink-0">
                            {index >= 4 && (
                              <button
                                onClick={() => handleRemove(index)}
                                className="p-3 bg-red-500 text-white rounded hover:bg-red-600"
                              >
                                <AiOutlineMinus />
                              </button>
                            )}
                            {index === marketing?.apiBenefits.length - 1 &&
                              marketing?.apiBenefits.length < 10 && (
                                <button
                                  onClick={handleAdd}
                                  className="p-3 bg-[#26683A] text-white rounded hover:bg-[#1e5630]"
                                >
                                  <AiOutlinePlus />
                                </button>
                              )}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div>
                      <Loader />
                      Generating...
                    </div>
                  )}
                </div>
              </div>

              <div className="flex  items-center justify-between">
                <label className="block text-gray-700 mt-[10px]">Reviews</label>
                <button
                  onClick={() => AiReviews(features)}
                  className="mt-[15px] rounded bg-[#26683A] text-[14px] cursor-pointer text-white ml-[20px] border px-[10px] p-[4px] mb-[10px]"
                >
                  Generate Review's
                </button>
              </div>
              <div className="border border-[#A8A4A4] border-dotted rounded p-4 mb-4 mt-1 w-[100%]">
                {reviewLoader == false ? (
                  customerReviews.map((review, index) => {
                    return (
                      <div key={index} className="mb-4 border-b pb-4">
                        <div className="flex">
                          {/* Customer Name */}
                          <div className="w-[100%] mr-[10px]">
                            <h3 className="block text-[16px] font-medium text-[#616161] mb-[5px]">
                              Customer Name
                            </h3>
                            <input
                              type="text"
                              className="w-full border rounded p-2 mb-2"
                              placeholder="Customer Name"
                              value={review.review_customer_name} // ✅ Correct key
                              onChange={(e) =>
                                handleReviewChange(
                                  index,
                                  "review_customer_name",
                                  e.target.value
                                )
                              }
                            />
                          </div>

                          {/* Customer Email */}
                          <div className="w-[100%] mr-[10px]">
                            <h3 className="block text-[16px] font-medium text-[#616161] mb-[5px]">
                              Customer Email
                            </h3>
                            <input
                              type="email"
                              className="w-full border rounded p-2 mb-2"
                              placeholder="Customer Email"
                              value={review.review_customer_email} // ✅ Correct key
                              onChange={(e) =>
                                handleReviewChange(
                                  index,
                                  "review_customer_email",
                                  e.target.value
                                )
                              }
                            />
                          </div>

                          {/* Rating */}
                          <div className="w-[100%] ml-[10px]">
                            <h3 className="block text-[16px] font-medium text-[#616161] mb-[5px]">
                              Rating
                            </h3>
                            <select
                              className="w-full border rounded p-2 mb-2"
                              value={review.review_star} // ✅ Correct key
                              onChange={(e) =>
                                handleReviewChange(
                                  index,
                                  "review_star",
                                  e.target.value
                                )
                              }
                            >
                              <option value="">Select</option>
                              <option value={"4.1"}>4.1</option>
                              <option value={"4.2"}>4.2</option>
                              <option value={"4.3"}>4.3</option>
                              <option value={"4.4"}>4.4</option>
                              <option value={"4.5"}>4.5</option>
                              <option value={"4.6"}>4.6</option>
                              <option value={"4.7"}>4.7</option>
                              <option value={"4.8"}>4.8</option>
                              <option value={"4.9"}>4.9</option>
                              <option value={"4.1"}>5</option>
                            </select>
                          </div>
                        </div>

                        {/* File Input */}
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={(e) => handleFileChange(index, e)}
                        />

                        {/* Display Selected Images */}
                        <div className="flex items-center mt-[10px]">
                          {review?.review_images?.length > 0 &&
                            review?.review_images.map((img, imgIndex) => (
                              <img
                                key={imgIndex}
                                src={img}
                                alt={`Review ${imgIndex}`}
                                className="w-20 h-20 object-contain m-2"
                              />
                            ))}
                        </div>

                        {/* Text Area for Comment */}
                        <textarea
                          className="w-full border rounded p-2 mt-2"
                          placeholder="Review Comment"
                          value={review.review_comment}
                          onChange={(e) =>
                            handleReviewChange(
                              index,
                              "review_comment",
                              e.target.value
                            )
                          }
                        ></textarea>
                      </div>
                    );
                  })
                ) : (
                  <div>
                    <Loader />
                    Generating...
                  </div>
                )}

                {/* Add More Reviews Button */}
                <button
                  onClick={addCustomerReview}
                  className="border border-[#A8A4A4] bg-[#F5F8F8] h-[44px] w-full rounded-[4px] text-center"
                >
                  Add More +
                </button>
              </div>

              <div className="flex  items-center justify-between">
                <label className="block text-gray-700 mt-[10px]">FAQ's</label>
                <button
                  onClick={() => AiFaq(features)}
                  className="mt-[15px] rounded bg-[#26683A] text-[14px] cursor-pointer text-white ml-[20px] border px-[10px] p-[4px] mb-[10px]"
                >
                  Generate FAQ's
                </button>
              </div>
              <div className="border rounded p-4">
                <h3 className="text-[16px] text-[#616161] font-semibold mb-2">
                  Frequently Asked Questions
                </h3>
                {loader ? (
                  <h1>
                    <Loader />
                    Generating...
                  </h1>
                ) : (
                  faqs.map((faq, index) => (
                    <div key={index} className="mb-4 border-b pb-4">
                      <CommonSearchDropDown
                        setMarketing={setMarketing}
                        setFaqs={setFaqs}
                        index={index}
                        faqData={faq}
                      />
                    </div>
                  ))
                )}
                <button
                  onClick={addFaq}
                  className="border border-[#A8A4A4] bg-[#F5F8F8] h-[44px] w-full rounded-[4px] text-center"
                >
                  Add More +
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </EditorProvider>
  );
};

export default Marketing;
