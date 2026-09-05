import type { Component } from 'svelte';

/**
 * 툴 패키지가 런처에 자기를 알리는 메타데이터.
 *
 * 툴은 자기 route를 모른다 — 껍데기(toolbox)가 정한다. @tool-package-contract 참조.
 */
export interface ToolManifest {
	/** 껍데기가 라우트·키로 쓰는 안정적인 식별자. kebab-case. */
	id: string;
	/** 런처 카드에 보일 이름. */
	title: string;
	/** 한 문장으로 무엇을 하는 툴인지. */
	description: string;
	/** 런처에서 묶일 그룹. */
	category: string;
	/** lucide 아이콘 컴포넌트. */
	icon: Component<{ class?: string }>;
	/**
	 * 이 툴이 요구하는 서버 엔드포인트 경로.
	 *
	 * 비어 있으면 브라우저에서 완결된다(기본). @client-first-processing 참조.
	 */
	serverRoutes?: string[];
}
