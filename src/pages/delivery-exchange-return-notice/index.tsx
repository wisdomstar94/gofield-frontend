import Head from "next/head";
import { useState } from "react";
import AccessTokenCheck from "../../components/auth/access-token-check/access-token-check.component";
import Topbar from "../../components/layouts/top-bar/top-bar.component";
import WindowSizeContainer from "../../components/layouts/window-size-container/window-size-container.component";

const ProductNewPage = () => {
  return (
    <>
      <Head>
        <title>고필드 - 배송/교환/반품 안내</title>
        <meta name="description" content="고필드 배송/교환/반품 안내 페이지입니다." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* <AccessTokenCheck __checkTarget="signup-complete-user"> */}
      <PageContents />
      {/* </AccessTokenCheck> */}
    </>
  );
};

const PageContents = () => {
  const [list, setList] = useState([
    {
      title: '교환/반품 안내',
      list: [
        {
          title: '반품비 : 5,000원 (편도기준/구매자귀책시 - 무료 배송시 왕복반품비부과)',
          content: '',
        },
        {
          title: '반품/교환 요청 후 배송완료일로부터 7일 이내에 상품반송을 하지 않을 경우 반품/교환이 불가능하며 직권구매결정 처리될 수 있습니다.',
          content: '',
        },
        {
          title: '반품을 원하시는 경우 우선 판매자에게 직접 연락을 취하셔서 반품사유, 배송방법, 반품배송비를 협의하신 후 상품을 반송하시면 됩니다.',
          content: '',
        },
        {
          title: '판매자와 협의하지 않고 일방적으로 반품처리할 경우 반품 승인 처리가 지연될 수 있으니 이 점 유의하시기 바랍니다.',
          content: '',
        },
      ],
    },
    {
      title: '교환/반품 규정',
      list: [
        {
          title: '반품 교환 가능',
          content: `
구매자 부담 비용이 없는 경우
1. 주문한 것과 다른 상품이 배송된 경우
2. 상품을 수령한 시점에서 중대한 결함이나 파손이 발생
구매자 부담 비용이 있는 경우 (왕복 택배비)
1. 고객님의 판단착오 (사이즈, 색상, 질감, 크기 등을 잘못 구입하신 경우)
2. 고객님의 단순변심으로 인한 반품          
          `.trim(),
        },
        {
          title: '반품 교환 불가능',
          content: `
다음과 같은 사유에 한하여 상품의 가치가 현저히 감소하게 되어 재판매가 불가능할 것으로 판단하여, 반품/교환이 불가능합니다.
1. 상품 배송완료 후 7일이 경과한 상품
2. 상품을 이미 사용하였거나 훼손된 경우
3. 상품의 증명서 및 라벨, 상표택 등이 분실되거나 훼손된 경우
          `.trim(),
        },
        {
          title: '반품을 원하시는 경우 우선 판매자에게 직접 연락을 취하셔서 반품사유, 배송방법, 반품배송비를 협의하신 후 상품을 반송하시면 됩니다.',
          content: '',
        },
        {
          title: '판매자와 협의하지 않고 일방적으로 반품처리할 경우 반품 승인 처리가 지연될 수 있으니 이 점 유의하시기 바랍니다.',
          content: '',
        },
      ],
    },
    {
      title: '주의사항',
      list: [
        {
          title: '고필드에 등록된 판매상품과 상품의 내용은 판매자가 등록한 것으로 (주)샐러리벅스에서는 그 등록내역에 대하여 일체의 책임을 지지 않습니다.',
          content: '',
        },
        {
          title: '상품 구매후 발생한 소비자 민원은 고필드에서 책임을 지며, 고필드에서는 민원 해결에 대한 의무가 있습니다.',
          content: '',
        },
        {
          title: '본 물품은 안전거래 물품으로 구매 시 결제금액을 고필드에서 보관하며, 구매자의 구매결정 또는 구매결정기간 만료 후 판매자에게 대금이 전달됩니다.',
          content: '',
        },
        {
          title: '거래방해 행위 / 안전거래 내 직거래유도 / 타사이트 거래유도 등 사이트내 정상거래가 아닌 글은 사전 통보없이 삭제 및 경고 또는 강제탈퇴 처리 됩니다.',
          content: '',
        },
        {
          title: '고필드 상품문의에 남기신 문의글은 삭제가 불가능 합니다.',
          content: '',
        },
      ]
    }
  ])

  return (
    <>
      <WindowSizeContainer __bgColor="#fff">
        <Topbar
          __layoutTypeB={{
            titleComponent: '배송/교환/반품 안내',
          }} />
        <ul className="w-full relative boxsizing px-6 py-6">
          {
            list.map((item, index) => {
              return (
                <li key={index} className="w-full relative mb-6">
                  <div data-name="title-row" className="block relative mb-4">
                    <span className="text-base font-bold text-black-a">{ item.title }</span>
                  </div>
                  <ul className="block relative p-0 m-0">
                    {
                      item.list.map((item2, index2) => {
                        return (
                          <li key={index2} className="list-none block relative mb-4 leading-3">
                            <div data-name="titlw-row" className="block relative mb-2">
                              <span className="text-sm font-normal text-black-a">{ item2.title }</span>
                            </div>
                            <div data-name="content-row" className="block relative">
                              <span className="text-xs font-light text-black-b">{ item2.content }</span>
                            </div>
                          </li>
                        );
                      })
                    }
                  </ul>
                  <div className="block h-px bg-gray-a mt-6"></div>
                </li>
              );
            })
          }
        </ul>
      </WindowSizeContainer>
    </>
  );
};

export default ProductNewPage;