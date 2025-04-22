import React, { useMemo } from "react";
import styled from "styled-components";
import { Card, Tag, Typography, Space, Button } from "antd";
import {
	GlobalOutlined,
	UserOutlined,
	TagOutlined,
	ReadOutlined,
	ExclamationOutlined,
	BorderOutlined,
	DownOutlined,
} from "@ant-design/icons";
import { IData_SnippetNews } from "../types";

const { Text, Title, Paragraph } = Typography;

const StyledCard = styled(Card)`
	background: transparent;
	border: 1px solid #404040;
	border-radius: 12px;
	backdrop-filter: blur(10px);
	.ant-card-body {
		padding: 16px;
	}
`;

const NewsTitle = styled(Title)`
	&.ant-typography {
		color: #1890ff !important;
		font-size: 16px;
	}
`;

const MetaInfo = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;
	margin-bottom: 8px;
	color: #8c8c8c;
`;

const HeaderInfo = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;
	margin-bottom: 16px;
	color: #8c8c8c;
`;

const StyledTag = styled(Tag)`
	&.negative {
		background: rgb(63, 216, 170);
		color: black;
		border: none;
		margin-left: auto;
		margin-right: 0 !important;
		padding: 0 9px;
	}
`;

const TrafficInfo = styled.div`
	display: flex;
	gap: 8px;
	align-items: center;
	color: #8c8c8c;
	margin-left: 4px;
`;

const TrafficValue = styled.span`
	.value {
		color: #8c8c8c;
	}
	.percentage {
		color: white;
	}
`;

const BottomSection = styled.div`
	margin-top: 16px;
	display: flex;
	flex-direction: column;
	gap: 16px;
`;

const SourceButton = styled(Button)`
	align-self: flex-start;
	background: rgba(255, 255, 255, 0.1);
	color: #1890ff;
`;

const DuplicatesInfo = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	.label {
		color: #8c8c8c;
	}
	.count {
		color: white;
	}
	.relevance {
		color: #8c8c8c;
		display: flex;
		align-items: center;
		gap: 4px;
	}
`;

const KeywordTags = styled.div`
	display: flex;
	gap: 8px;
	margin-top: 12px;
	flex-wrap: wrap;
`;

const KeywordTag = styled(Tag)`
	background: transparent !important;
	border: 1px solid #404040 !important;
	border-radius: 16px !important;
	color: #8c8c8c !important;
	display: flex;
	align-items: center;
	gap: 4px;

	.count {
		color: white;
	}

	&.show-all {
		border: none !important;
		color: #1890ff !important;
		padding-left: 0;
		padding-right: 0;
	}
`;

const DomainLink = styled.a`
	color: #1890ff;
	text-decoration: underline;
	&:hover {
		opacity: 0.8;
	}
`;

const Description = styled(Paragraph)`
	color: white;
	margin-bottom: 0px;

	.highlight {
		background: #1890ff;
		padding: 2px 4px;
	}
`;

const DuplicatePreview = styled.div`
	border: 1px solid #1890ff;
	border-radius: 8px;
	padding: 12px;
	background: transparent;
`;

const DateText = styled.span`
	.day {
		color: white;
	}
	.rest {
		color: #8c8c8c;
	}
`;

const ReachText = styled.span`
	margin-left: 4px;
	.number {
		color: white;
	}
	.label {
		color: #8c8c8c;
	}
`;

const CountryInfo = styled.div`
	display: flex;
	align-items: center;
	gap: 4px;
	.flag {
		font-size: 16px;
	}
`;

const ViewDuplicates = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 8px;
	border: 1px solid rgb(255, 255, 255);
	border-radius: 8px;
	color: white;
	padding: 8px;
	margin-top: 8px;
	background: transparent;
	cursor: pointer;
	.anticon {
		color: white;
	}
`;

const ShowMoreText = styled.div`
	color: #1890ff;
	display: flex;
	align-items: center;
	gap: 4px;
	cursor: pointer;

	.triangle {
		width: 0;
		height: 0;
		border-left: 4px solid transparent;
		border-right: 4px solid transparent;
		border-top: 6px solid #1890ff;
		margin-top: 2px;
	}
`;

const countryFlags: Record<string, string> = {
	India: "🇮🇳",
	USA: "🇺🇸",
	Mexico: "🇲🇽",
	France: "🇫🇷",
	Germany: "🇩🇪",
	Italy: "🇮🇹",
	Spain: "🇪🇸",
	Portugal: "🇵🇹",
	China: "🇨🇳",
	Brazil: "🇧🇷",
	Argentina: "🇦🇷",
	Chile: "🇨🇱",
	Colombia: "🇨🇴",
	Peru: "🇵🇪",
};

const NewsCard: React.FC<{ data: IData_SnippetNews }> = ({ data }) => {
	const formatDate = useMemo(() => {
		const date = new Date(data.DP);
		const day = date.getDate();
		const month = date.toLocaleString("en-US", { month: "short" });
		const year = date.getFullYear();
		return (
			<DateText>
				<span className="day">{day}</span>
				<span className="rest">
					{" "}
					{month} {year}
				</span>
			</DateText>
		);
	}, [data.DP]);

	const formatNumber = useMemo(() => {
		if (data.REACH >= 1000) {
			return (
				<ReachText>
					<span className="number">
						{(data.REACH / 1000).toFixed(0)}k
					</span>
					<span className="label"> Reach</span>
				</ReachText>
			);
		}
		return `${data.REACH} Reach`;
	}, [data.REACH]);

	const formatPercentage = (value: number) => Math.round(value * 100);

	const highlightKeywords = useMemo(() => {
		let highlightedText = data.AB;
		data.KW.forEach((kw) => {
			const regex = new RegExp(kw.value, "gi");
			highlightedText = highlightedText.replace(
				regex,
				`<span class="highlight">${kw.value}</span>`
			);
		});
		return <div dangerouslySetInnerHTML={{ __html: highlightedText }} />;
	}, [data.AB, data.KW]);

	const getCountryFlag = (countryName: string): string =>
		countryFlags[countryName] || "🏳️";

	return (
		<StyledCard>
			<Space direction="vertical" size={0} style={{ width: "100%" }}>
				<MetaInfo>
					<Text>{formatDate}</Text>
					<Text>{formatNumber}</Text>
					<TrafficInfo>
						<Text>Top Traffic:</Text>
						{data.TRAFFIC.map((traffic, index) => (
							<TrafficValue key={index}>
								<span className="value">{traffic.value} </span>
								<span className="percentage">
									{formatPercentage(traffic.count)}%
								</span>
								{index < data.TRAFFIC.length - 1 ? "," : ""}
							</TrafficValue>
						))}
					</TrafficInfo>
					<StyledTag className={data.SENT.toLowerCase()}>
						{data.SENT}
					</StyledTag>
					<ExclamationOutlined />
					<BorderOutlined />
				</MetaInfo>

				<NewsTitle level={4}>{data.TI}</NewsTitle>

				<HeaderInfo>
					<GlobalOutlined />
					<DomainLink href={`https://${data.DOM}`} target="_blank">
						{data.DOM}
					</DomainLink>
					<CountryInfo>
						<span className="flag">
							{getCountryFlag(data.TRAFFIC[0].value)}
						</span>
						<Text style={{ color: "#8c8c8c" }}>
							{data.TRAFFIC[0].value}
						</Text>
					</CountryInfo>
					<Space>
						<ReadOutlined />
						<Text style={{ color: "#8c8c8c" }}>En</Text>
					</Space>
					<Space>
						<UserOutlined />
						<Text style={{ color: "#8c8c8c" }}>
							{data.AU.length > 0
								? data.AU.join(", ")
								: "Unknown Authors"}
						</Text>
					</Space>
				</HeaderInfo>

				<Description>{highlightKeywords}</Description>
				<ShowMoreText>
					Show more
					<span className="triangle" />
				</ShowMoreText>

				<KeywordTags>
					{data.KW.map((kw, index) => (
						<KeywordTag key={index}>
							<TagOutlined />
							{kw.value} <span className="count">{kw.count}</span>
						</KeywordTag>
					))}
					<KeywordTag className="show-all">Show All +20</KeywordTag>
				</KeywordTags>

				<BottomSection>
					<SourceButton type="text">Original Source</SourceButton>
					<DuplicatesInfo>
						<Text>
							<span className="label">Duplicates: </span>
							<span className="count">192</span>
						</Text>
						<Text className="relevance">
							By Relevance
							<DownOutlined style={{ color: "white" }} />
						</Text>
					</DuplicatesInfo>
					<DuplicatePreview>
						<MetaInfo style={{ marginBottom: 8 }}>
							<Text>{formatDate}</Text>
							<Text>{formatNumber}</Text>
							<ExclamationOutlined
								style={{ marginLeft: "auto" }}
							/>
							<BorderOutlined />
						</MetaInfo>
						<NewsTitle level={4} style={{ marginBottom: 8 }}>
							{data.TI}
						</NewsTitle>
						<HeaderInfo style={{ marginBottom: 0 }}>
							<GlobalOutlined />
							<DomainLink
								href={`https://${data.DOM}`}
								target="_blank"
							>
								{data.DOM}
							</DomainLink>
							<CountryInfo>
								<span className="flag">
									{getCountryFlag(data.TRAFFIC[0].value)}
								</span>
								<Text style={{ color: "#8c8c8c" }}>
									{data.TRAFFIC[0].value}
								</Text>
							</CountryInfo>
							<Space>
								<ReadOutlined />
								<Text style={{ color: "#8c8c8c" }}>En</Text>
							</Space>
							<Space>
								<UserOutlined />
								<Text style={{ color: "#8c8c8c" }}>
									{data.AU.length > 0
										? data.AU.join(", ")
										: "Unknown Authors"}
								</Text>
							</Space>
						</HeaderInfo>
					</DuplicatePreview>
					<ViewDuplicates>
						<DownOutlined />
						View Duplicates
					</ViewDuplicates>
				</BottomSection>
			</Space>
		</StyledCard>
	);
};

export default React.memo(NewsCard);
